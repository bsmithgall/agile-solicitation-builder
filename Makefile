install:
	pip install -r requirements.txt
	cd web && npm install

setup:
	make install
	flask -a server.py seed_db

test-backend:
	nosetests asb/test

test-frontend:
	cd web && npm test

test:
	make test-backend
	make test-frontend
