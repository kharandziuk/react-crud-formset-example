import * as mui from "@material-ui/core";
import List from "../components/List.js";
import Detail from "../components/Detail.js";

export default function Main() {
  return (
    <mui.Container>
      <mui.Grid container spacing={3}>
        <List />
        <Detail />
      </mui.Grid>
    </mui.Container>
  );
}
