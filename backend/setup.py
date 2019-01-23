import setuptools

setuptools.setup(
  name="jupyterlab-metadata-service-server",
  version='0.1',
  license='BSD-3-Clause',
  author='CalPoly/Quansight',
  # py_modules rather than packages, since we only have 1 file
  py_modules=['jupyterlab_metadata_service_server.metadata'],
  entry_points={
      'jupyter_serverproxy_servers': [
          # name = packagename:function_name
          'metadata = jupyterlab_metadata_service_server.metadata.metadata:start',
      ]
  },
  install_requires=['jupyter-server-proxy']
)
