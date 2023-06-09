import sqlite3

# Create a connection to the database
connection = sqlite3.connect('my_database.db')

# Create a cursor object
cursor = connection.cursor()

# Create a table to store the user data
cursor.execute('create table users (username text, password text, name text, email text, profile_picture text)')

# Commit the changes to the database
connection.commit()

# Close the connection to the database
connection.close()


def add_user(username, password, name, email, profile_picture):
    # Connect to the database
    connection = sqlite3.connect('my_database.db')

    # Create a cursor object
    cursor = connection.cursor()

    # Create a list of values to insert into the database
    values = [username, password, name, email, profile_picture]

    # Insert the values into the database
    cursor.execute('insert into users (username, password, name, email, profile_picture) values (%s, %s, %s, %s, %s)', values)

    # Commit the changes to the database
    connection.commit()

    # Close the connection to the database
    connection.close()


if __name__ == '__main__':
    username = input('Enter username: ')
    password = input('Enter password: ')
    name = input('Enter name: ')
    email = input('Enter email: ')
    profile_picture = input('Enter profile picture: ')

    add_user(username, password, name, email, profile_picture)

    print('User added successfully!')
