"""JupyterLab Metadata Service Server"""
import os


def start():
    """Start JupyterLab Metadata Service Server Start

    Returns:
        dict -- A dictionary with the node command that will start the
                Metadata Service Server

    """
    path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(path, 'jupyterlab_metadata_service_server')

    return {
        'command': [
            'node', os.path.join(path, 'src', 'index.js'), '{port}'
        ]
    }
