module.exports = {

  authNumberCreate: () => {

    let number = Math.floor(Math.random() * 10000);
    
    if (100 <= number && number < 1000) {
      number = `0${String(number)}`;

      return number;
    }

    if (10 <= number && number < 100) {
      number = `00${String(number)}`;

      return number;
    }

    if (0 <= number && number < 10) {
      number = `000${String(number)}`;

      return number;
    }

    return number;
  }
  
};