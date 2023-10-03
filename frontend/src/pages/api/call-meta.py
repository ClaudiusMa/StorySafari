from metaphor_python import Metaphor


metaphor = Metaphor("3ffeaa1e-c0dd-4a9f-a86a-25a9dbfac823")

response = metaphor.search(
  "Portfolio of designers who work in Apple",
  num_results=20,
  use_autoprompt=True,
)