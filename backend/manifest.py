from glob import glob
import os


def get_path_files(path):
    path_files = []
    for f_path in glob(os.path.join(path, '*')):
        if os.path.isdir(f_path):
            path_files += get_path_files(f_path)
        elif f_path[-3:] != '.py':
            path_files.append(f_path.replace(' ', '?'))
    return path_files

path = os.path.join('jupyterlab_metadata_service_server/')
extra_files = get_path_files(path)

with open('MANIFEST.in', 'w') as f_manifest:
    for f in extra_files:
        f_manifest.write('include {}\n'.format(f))

