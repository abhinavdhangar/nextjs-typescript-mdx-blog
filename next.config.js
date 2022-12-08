const path = require('path')

module.exports = {
  trailingSlash:true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    unoptimized: true,
    domains: ['hopenode-arcaned.ap-south-1.linodeobjects.com',"media.graphassets.com","images.unsplash.com"],
  },
}