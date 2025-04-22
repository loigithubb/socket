const CircuitBreaker = require('opossum');
const Bottleneck = require('bottleneck');

// Tạo limiter: Giới hạn 2 requests/second
const limiter = new Bottleneck({
  minTime: 500, // 500ms giữa các request (tương đương 2 requests/second)
});

// Hàm retry thủ công
const withRetry = async (fn, retries = 2, delay = 1000) => {
  let lastError;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries) await new Promise(res => setTimeout(res, delay));
    }
  }
  throw lastError;
};

// Factory method để tạo CircuitBreaker
const createBreaker = (requestFn, serviceName = '') => {
  const wrappedFn = () => limiter.schedule(() => withRetry(requestFn, 2, 1000));

  const breaker = new CircuitBreaker(wrappedFn, {
    timeout: 3000, // Time limiter: timeout sau 3s
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  });

  breaker.fallback(() => ({
    data: `${serviceName} is currently unavailable. Please try again later.`
  }));

  breaker.on('open', () => console.warn(`[${serviceName}] 🔌 Circuit opened`)); // Log khi mở circuit
  breaker.on('close', () => console.info(`[${serviceName}] ✅ Circuit closed`)); // Log khi đóng circuit
  breaker.on('halfOpen', () => console.info(`[${serviceName}] 🟡 Half-open`)); // Log khi circuit ở trạng thái half-open

  return breaker;
};

module.exports = { createBreaker };
