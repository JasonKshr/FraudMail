from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["POST"])
def upload_file(request):
    image = request.FILES.get("image")

    if image is None:
        return Response({"error": "No image provided"}, status=400)

    return Response({
        "message": "Image uploaded successfully",
        "image_name": image.name
    }, status=200)