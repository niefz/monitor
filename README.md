## json-server 使用方法
- axios({
  - method: 'POST',
  - url: 'http://localhost:3030/menu',
  - headers: {
    - 'Content-Type': 'application/json',
  - },
  - data: {
  -   name: '公共通讯录',
  -   icon: 'icon-common',
  - },
- }).then((json) => {
  - console.log(json);
- });