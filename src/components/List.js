import { useStoreState, useStoreActions } from "easy-peasy";
import * as mui from "@material-ui/core";
import useStyles from "../useStyles";
import * as icons from "@material-ui/icons";
import _ from "lodash";

export default function List() {
  const people = useStoreState((store) => store.people.items);
  const selected = useStoreState((store) => store.people.selected);

  const setActive = useStoreActions((store) => store.people.setActive);
  const deleteItem = useStoreActions((store) => store.people.deleteItem);

  const classes = useStyles();
  console.log(people);
  return (
    <mui.Grid item xs={12} md={3}>
      <mui.Typography variant="h6" className={classes.title}>
        People
      </mui.Typography>
      <div className={classes.demo}>
        <mui.List dense>
          {people.map((x, i) => (
            <mui.ListItem
              button
              selected={i === selected}
              key={i}
              onClick={() => setActive(i)}
            >
              <mui.ListItemAvatar>
                {_.isNull(x.photo) ? (
                  <mui.Avatar>
                    <icons.Face />
                  </mui.Avatar>
                ) : (
                  <mui.Avatar src={`data:image/jpeg;base64,${x.photo}`} />
                )}
              </mui.ListItemAvatar>
              <mui.ListItemText primary={`${x.firstName} ${x.lastName}`} />
              <mui.ListItemSecondaryAction>
                <mui.IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteItem(i)}
                >
                  <icons.Delete />
                </mui.IconButton>
              </mui.ListItemSecondaryAction>
            </mui.ListItem>
          ))}
        </mui.List>
      </div>
    </mui.Grid>
  );
}
