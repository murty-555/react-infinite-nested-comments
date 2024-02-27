const useNode = () => {
  const insertNode = (tree, commentId, item) => {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, commentId, item);
    });
    return { ...tree, items: latestNode };
  };

  const editNode = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.name = value;
      return tree;
    }
    tree.items.map((obj) => {
      return editNode(obj, commentId, value);
    });
    return { ...tree };
  };

  const deleteNode = (tree, id) => {
    for(let i=0; i < tree.items.length; i++){
        const currentItem = tree.items[i];
        if(currentItem.id === id){
            tree.items.splice(i,1)
            return tree;
        }else{
            deleteNode(currentItem, id)
        }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode };
};
export default useNode;
