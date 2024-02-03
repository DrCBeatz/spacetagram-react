# core/management/commands/prepare_react_template.py

from django.core.management.base import BaseCommand
import os


class Command(BaseCommand):
    help = "Modify the index.html file to be a Django template"

    def handle(self, *args, **kwargs):
        # Path to the index.html file
        file_path = os.path.join("static", "index.html")

        # Read the original content
        with open(file_path, "r") as file:
            content = file.read()

        # Add the {% load static %} at the beginning
        content = "{% load static %}\n" + content

        # Replace the assets URLs with Django static template tags
        content = content.replace('src="/assets/', "src=\"{% static 'assets/")
        content = content.replace(
            'href="/assets/', "href=\"{% static 'assets/"
        )

        # Replace the ending of the script and link tags to include Django's %}
        content = content.replace('.js"', ".js' %}\"")
        content = content.replace('.css"', ".css' %}\"")

        # Write the modified content back
        with open(file_path, "w") as file:
            file.write(content)

        self.stdout.write("index.html has been updated!")
