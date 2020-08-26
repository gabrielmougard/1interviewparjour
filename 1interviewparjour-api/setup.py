#!/usr/bin/env python3

import os
import setuptools


def _read_reqs(relpath):
    fullpath = os.path.join(os.path.dirname(__file__), relpath)
    with open(fullpath) as f:
        return [s.strip() for s in f.readlines() if (s.strip() and not s.startswith("#"))]


setuptools.setup(
    name='oneinterviewparjour',
    version='0.1',
    install_requires=_read_reqs("requirements/base.txt"),
    test_require=_read_reqs("requirements/base-test.txt"),
    dependency_links=[],
    entry_points={
        'console_scripts': [
            'oneinterviewparjour = oneinterviewparjour.run:main'
        ],
    },
    packages=setuptools.find_packages(),
    zip_safe=False,
)
