import * as mui from "@material-ui/core";
import useStyles from "../useStyles";
import * as icons from "@material-ui/icons";
import _ from "lodash";

export default function List({ data, actions }) {
  const classes = useStyles();

  return (
    <mui.Grid item xs={12} md={3}>
      <mui.Typography variant="h6" className={classes.title}>
        People
      </mui.Typography>
      <div className={classes.demo}>
        <mui.Button
          variant="contained"
          color="secondary"
          disabled={data.isAdding}
          startIcon={<icons.Add />}
          onClick={() => actions.startAdding()}
        >
          Add
        </mui.Button>
        <mui.List dense>
          {data.isAdding ? (
            <mui.ListItem button selected>
              <mui.ListItemAvatar>
                <mui.Avatar>
                  <icons.Face />
                </mui.Avatar>
              </mui.ListItemAvatar>
              <mui.ListItemText primary={"New Entry"} />
              <mui.ListItemSecondaryAction>
                <mui.IconButton edge="end" aria-label="cancel">
                  <icons.Cancel />
                </mui.IconButton>
              </mui.ListItemSecondaryAction>
            </mui.ListItem>
          ) : null}
          {data.people.map((x, i) => (
            <mui.ListItem
              button
              selected={i === data.selected}
              key={i}
              onClick={() => actions.setActive(i)}
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
                  onClick={() => actions.deleteItem(i)}
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
