import React, { useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import mainListItems from "./ListItems";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import CompaniesPage from "./company/CompaniesPage";
import CompanyPage from "./company/CompanyPage";
import Team from "./contact/Team";
import About from "./About/About";
import Copyright from "./footer/Footer";
import Search from "./Search";
import PopularCompanies from "./popular-companies/PopularCompanies";
import NotFound from "./not_found_404/NotFound";
import logo from "../assets/images/logo.svg";
import Home from "./home/Home";
import Profile from "./Profile/Profile";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useStyles from "./DashboardStyle";
import Languages from "./languageMenu/Languages";

export default function Dashboard() {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.replace(`/`);
    }
  }, []);

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [, setWidth] = React.useState(50);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { t } = useTranslation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setWidth(120);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setWidth(50);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem
        onClick={() => {
          localStorage.removeItem("id");
          localStorage.removeItem("user");
          localStorage.removeItem("name");
          localStorage.removeItem("surname");
          localStorage.removeItem("email");
          window.location.replace(`/`);
        }}
      >
        {t("Dashboard.2")}
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button
          onClick={() => handleClick("en")}
          style={{ backgroundColor: "#eef3f4" }}
        >
          <img src="https://img.icons8.com/emoji/20/000000/united-kingdom-emoji.png" />
        </Button>
      </MenuItem>

      <MenuItem>
        <Button
          onClick={() => handleClick("tr")}
          style={{ backgroundColor: "#eef3f4" }}
        >
          <img src="https://img.icons8.com/emoji/20/000000/turkey-flag-emoji.png" />
        </Button>
      </MenuItem>

      <MenuItem
        onClick={handleProfileMenuOpen}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon style={{ backgroundColor: "#eef3f4" }} />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{ backgroundColor: "#1e88e5" }}
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={t("Dashboard.1")}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    window.location.replace(`/search?q=${e.target.value}`);
                  }
                }}
              />
            </div>

            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              <Languages/>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            {/* LOGO */}
            <div className={classes.logo}>
              <Link
                activeclassname="is-active"
                style={{ color: "black", textDecoration: "none" }}
                to="/home"
              >
                <img src={logo} alt="LOGO" style={{ width: 50 }} />
              </Link>
              <Typography component="h5" color="primary" variant="h5">
                VOTING
              </Typography>
            </div>

            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems()}</List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper className={classes.paper}>
                  <Switch>
                    <Route path="/home">
                      <Home />
                    </Route>
                    <Route path="/search">
                      <Search />
                    </Route>
                    <Route path="/companies">
                      <CompaniesPage />
                    </Route>

                    <Route path="/company/:companyID">
                      <CompanyPage />
                    </Route>

                    <Route path="/popular-companies">
                      <PopularCompanies />
                    </Route>

                    <Route path="/about">
                      <About />
                    </Route>

                    <Route path="/profile">
                      <Profile />
                    </Route>

                    <Route path="/contact">
                      <Team />
                    </Route>

                    <Route path="*">
                      <Redirect exact to="/404" />
                      <NotFound />
                    </Route>
                  </Switch>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </main>
      </div>
    </Router>
  );
}
