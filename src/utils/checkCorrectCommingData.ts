/**check whether external weather API returns a correct number of elements in the body */
const checkCorrectCommingData = (data : object[]) : boolean=>{
    const result = data.every((elem : any)=> {
      if (elem ===  undefined) return false;
      return true;
    });
    return result;
  }
  export default checkCorrectCommingData;