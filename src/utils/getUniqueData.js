const getUniqueData = (contents) => {

    const uniqueData = [...new Map(contents.map((item) => [item?.video?.videoId, item])).values()];
    return uniqueData;

}

export default getUniqueData;