import setuptools

from glob import glob
import os


def get_path_files(path):
    all_files = []
    path_files = []
    for f_path in glob(os.path.join(path, '*')):
        if os.path.isdir(f_path):
            all_files += get_path_files(f_path)
        elif f_path[-3:] != '.py':
            path_files.append(f_path)

    all_files += [(path, path_files)]
    return all_files

path = os.path.join('jupyterlab_metadata_service_server/')
extra_files = get_path_files(path)


setuptools.setup(
  name="jupyterlab-metadata-service-server",
  version='0.1',
  license='BSD-3-Clause',
  author='CalPoly/Quansight',
  author_email='jupyterlab@localhost',
  url='https://github.com/jupyterlab/jupyterlab-metadata-service',
  # py_modules rather than packages, since we only have 1 file
  packages=['jupyterlab_metadata_service_server'],
  entry_points={
      'jupyter_serverproxy_servers': [
          # name = packagename:function_name
          'metadata = jupyterlab_metadata_service_server.metadata.metadata:start',
      ]
  },
  install_requires=['jupyter-server-proxy'],
  data_files=extra_files
)
