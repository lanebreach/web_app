module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lane Breach`,
        short_name: `LaneBreach`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/blfa-icon.png`
      }
    },
    `gatsby-plugin-offline`
  ]
};
