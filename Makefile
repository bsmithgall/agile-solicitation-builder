test-backend:
	nosetests asb/test

test-frontend:
	cd web && npm test

test:
	make test-backend
	make test-frontend
