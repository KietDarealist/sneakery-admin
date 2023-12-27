import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const ITEM_HEIGHT = 48;

interface IActionMenuProps {
  options: {
    id: string;
    title: string;
    onPress: () => void;
    onActionSuccess: () => void;
  }[];
}

const ActionMenu: React.FC<IActionMenuProps> = ({ options }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "22ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option?.id}
            onClick={() => {
              option.onPress();
              handleClose();
            }}
          >
            {option?.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionMenu;
