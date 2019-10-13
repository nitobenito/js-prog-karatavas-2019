# Uzstādīšana

## Windows (Vista vai jaunāka versija)

Python 3 instalācija: https://www.python.org/downloads/windows/

```cmd
> py -m pip install Flask
```

## Linux

```bash
$ pip install Flask
```

# Palaišana

## Windows (cmd)

```cmd
> set FLASK_APP=app.py
> py -m flask run
```

## Linux

```bash
$ export FLASK_APP=app.py
$ python -m flask run
```

# Piekļuve

Ja palaišana ir veiksmīgi notikusi, lapa ir pieejama adresē http://127.0.0.1:5000/