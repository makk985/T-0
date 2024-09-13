from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/projects')
def projects():
    projects = [
        {'id': 1, 'name': 'Project 1', 'description': 'This is the first project'},
        {'id': 2, 'name': 'Project 2', 'description': 'This is the second project'},
        {'id': 3, 'name': 'Project 3', 'description': 'This is the third project'},
        {'id': 4, 'name': 'Project 4', 'description': 'This is the fourth project'}
    ]
    return render_template('projects.html', projects=projects)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)



