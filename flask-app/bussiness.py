def get_data():
    with open('names.txt', 'r') as f:
        names = f.read()
        names = names.splitlines()
        return names
    