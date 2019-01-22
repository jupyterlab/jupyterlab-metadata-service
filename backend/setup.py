import setuptools

setuptools.setup(
  name="jupyter-metadata-service-server",
  # py_modules rather than packages, since we only have 1 file
  py_modules=['metadata'],
  entry_points={
      'jupyter_serverproxy_servers': [
          # name = packagename:function_name
          'metadata = metadata:start',
      ]
  },
)