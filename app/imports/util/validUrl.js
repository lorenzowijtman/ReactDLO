//bepaald of een vraag string afbeelding attributen bevat zodat abeelding correct in het resultaat getoont worden
const is_url = (str) =>
{let returnValue = false;
    if (str.includes(".png") ||str.includes(".jpg") || str.includes(".gif")){
        returnValue = true;
    }
    return returnValue;}

  export default is_url;
