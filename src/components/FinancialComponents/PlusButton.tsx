import * as React from 'react';
import Menu from '@mui/material/Menu';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Divider from '@mui/material/Divider';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { AddInvestment } from './AddInvestment';
import { AddLoan } from './AddLoan';

const actions = [
    { icon: AddInvestment, name: "Investment" },
    { icon: AddLoan, name: "Loan" },

];

export const PlusButton = () => {

    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEl);

    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div id="add-btn">
            <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                // sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                FabProps={{
                    sx: {
                        bgcolor: 'secondary.main',
                        '&:hover': {
                            bgcolor: 'secondary.main',
                        }
                    }
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={<action.icon handleClose={handleClose} />}
                        tooltipTitle={action.name}
                        tooltipOpen
                    />
                ))}
            </SpeedDial>


            {/* <Fab
                aria-label="add"
                color="secondary"
                sx={{ color: "white" }}
                onClick={handleClick}
            >
                <AddIcon />
            </Fab>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                //@ts-ignore
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <AddInvestment handleClose={handleClose} />
                <Divider />
                <AddLoan handleClose={handleClose} />
            </Menu> */}
        </div >
    );
}
