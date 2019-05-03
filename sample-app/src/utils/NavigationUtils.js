class NavigationUtils {
  getNavigationConstants = async () => {
    const items = [
      {
        label: 'Sort By Name (Ascending)',
        type: 'cardHolderName',
        isAscending : true
      },
      {
        label: 'Sort By Name (Descending)',
        type: 'cardHolderName',
        isAscending : false
      },
      {
        label: 'Sort By balance limit (Ascending)',
        type: 'limitBalance',
        isAscending : true
      },
      {
        label: 'Sort By balance limit (Descending)',
        type: 'videoUploaded',
        isAscending : false
      }
    ];
    return items;
  };

  getNavigationConstantsList = async () => {
    const items = await this.getNavigationConstants();
    return items;
  };
}

const navigationUtils = new NavigationUtils();

export default navigationUtils;
