from rest_framework.decorators import api_view
from rest_framework.response import Response
from detector.ocr import extract_text

@api_view(["POST"])
def upload_file(request):
    image = request.FILES.get("image")

    if image is None:
        return Response({"error": "No image provided"}, status=400)
      
    text = extract_text(image)

    return Response({
        "message": "Image uploaded successfully",
        "image_name": image.name,
        "image_text": text
    }, status=200)