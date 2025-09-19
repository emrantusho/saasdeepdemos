{# Conditionally load and inline solar system JavaScript for the homepage #}
{% if section == "home" %}
  {% set js %}
    {% include "assets/js/solar-system.js" %}
  {% endset %}
  <script>{{ js | jsmin | safe }}</script>
{% endif %}// Add your inline JS here
