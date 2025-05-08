import React from "react";
import { Box, Typography, Container, Grid, Link, IconButton, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MovieIcon from "@mui/icons-material/Movie";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GitHubIcon />, url: "https://github.com", label: "GitHub" },
    { icon: <TwitterIcon />, url: "https://twitter.com", label: "Twitter" },
    { icon: <InstagramIcon />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FacebookIcon />, url: "https://facebook.com", label: "Facebook" },
  ];

  const footerLinks = [
    { name: "About", url: "#" },
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Contact", url: "#" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MovieIcon sx={{ fontSize: 24, mr: 1 }} />
              <Typography variant="h6">
                Movie Explorer
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Discover and explore the world of cinema with our curated collection of movies. Powered by TMDb API.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

        <Typography variant="body2" align="center">
          © {currentYear} Movie Explorer. All rights reserved. Powered by TMDb.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
