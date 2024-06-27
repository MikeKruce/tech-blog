// module.exports = {
//   format_date: (date) => {
//     if (!date) {
//       return '';
//     }
//     const d = new Date(date);
//     if (isNaN(d.getTime())) {
//       return '';
//     }
//     return d.toLocaleDateString();
//   },
//   ifCond: function (v1, v2, options) {
//     if (v1 === v2) {
//       return options.fn(this);
//     }
//     return options.inverse(this);
//   }
// };
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  ifCond: function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
