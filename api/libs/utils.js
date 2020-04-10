module.exports = {
  makeId: (length) => {
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   return Array(length).fill('').map(item => (
     chars.charAt(Math.floor(Math.random() * chars.length))
   )).join('');
 }
}
