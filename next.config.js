const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['hopenode-arcaned.ap-south-1.linodeobjects.com',"media.graphassets.com","images.unsplash.com"],
  },
}