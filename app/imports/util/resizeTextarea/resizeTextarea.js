const resizeTextarea = (e) => {
    const {target} = e;

    if(target.scrollTop !== 0) {
        target.style.height = target.scrollHeight + "px";
    }
}

export default resizeTextarea;