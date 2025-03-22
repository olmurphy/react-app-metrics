


push:
	@read -p "Enter commit message: " msg; \
	git add -A; \
	git commit -m "$$msg"; \
	git push
