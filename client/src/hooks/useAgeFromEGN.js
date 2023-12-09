import { useState, useEffect } from 'react';

const useAgeFromEGN = (egn) => {
  const [age, setAge] = useState(null);

  useEffect(() => {
    if (egn && egn.length === 10) {
      
      let birthYear = parseInt(egn.substring(0, 2));
      let birthMonth = parseInt(egn.substring(2, 4));
      let birthDay = parseInt(egn.substring(4, 6));

      if(birthMonth > 40){
        birthYear += 2000
        birthMonth -= 40
      }
      else if(birthMonth > 20){
        birthYear += 1800
        birthMonth -= 20
      }
      else
        birthYear += 1900

      
      let birthDate = new Date();
      birthDate.setFullYear(birthYear, birthMonth, birthDay);

      
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setAge(age);
    } else {
      setAge(null);
    }
  }, [egn]);

  return age;
};

export default useAgeFromEGN;
