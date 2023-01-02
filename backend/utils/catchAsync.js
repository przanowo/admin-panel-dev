module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Regarding the course above the corrected version by eslint
// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
