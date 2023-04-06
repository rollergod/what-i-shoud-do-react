import React from "react";

import { SideBlock } from "../SideBlock/SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Grid, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export const LastPostsBlock = ({ items }) => {
    return (
        <SideBlock title="Последние статьи">
            <Grid item xs={12} md={6}>
                <Demo>
                    <List dense>
                        {
                            items.map((obj, index) => {
                                return (
                                    <ListItem>
                                        <ListItemText>
                                            <Link to={`/posts/${obj.id}`}>{obj.title}</Link>
                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Demo>
            </Grid>
        </SideBlock >
    );
};
