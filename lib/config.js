const { env } = process

module.exports = {
  port: env.PORT || 3000,
  host: env.HOST || '0.0.0.0',
  theme_directory: env.THEME_DIRECTORY || '/usr/share/logwatch/default.conf/html'
}
