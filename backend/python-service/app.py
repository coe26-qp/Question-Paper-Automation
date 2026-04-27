# from flask import Flask, request, jsonify
# from openpyxl import load_workbook
# import base64
# import traceback

# app = Flask(__name__)

# # safe anchor reader
# def get_anchor(img):
#     try:
#         if hasattr(img.anchor, "_from"):
#             return img.anchor._from.row + 1, img.anchor._from.col + 1
#         elif hasattr(img.anchor, "from_"):
#             return img.anchor.from_.row + 1, img.anchor.from_.col + 1
#         else:
#             return None, None
#     except:
#         return None, None

# @app.route("/")
# def home():
#     return "Flask API is running!"


# @app.route("/extract", methods=["POST"])
# def extract_questions():
#     try:
#         # 1️⃣ Check file
#         if "file" not in request.files:
#             return jsonify({"error": "No file uploaded"}), 400

#         file = request.files["file"]

#         # 2️⃣ Load Excel
#         wb = load_workbook(file)
#         ws = wb.active

#         results = []

#         # 3️⃣ Loop rows (skip header)
#         for row_index, row in enumerate(ws.iter_rows(min_row=2), start=2):

#             if not any(cell.value for cell in row):
#                 continue

#             unit = row[0].value
#             co = row[1].value
#             unit_title = row[2].value
#             qtype = row[3].value
#             part = row[4].value
#             question_text = row[5].value
#             marks = row[6].value
#             bt = row[7].value
#             level = row[8].value

#             # normalize TYPE (important for Mongo enum)
#             if qtype:
#                 qtype = str(qtype).strip().upper()

#             # ---------- IMAGE DETECTION ----------
#             question_image = None

#             for img in ws._images:
#                 img_row, img_col = get_anchor(img)

#                 # Question column = 6
#                 if img_row == row_index and img_col == 6:
#                     img_bytes = img._data()
#                     question_image = base64.b64encode(img_bytes).decode("utf-8")
#                     break

#             # ---------- STORE BOTH ----------
#             results.append({
#                 "unit": unit,
#                 "co": co,
#                 "unit_title": unit_title,
#                 "type": qtype,
#                 "part": part,
#                 "marks": marks,
#                 "bt": bt,
#                 "level": level,
#                 "questionText": question_text if question_text else None,
#                 "questionImage": question_image
#             })

#         # ⭐⭐⭐ THE MOST IMPORTANT LINE ⭐⭐⭐
#         return jsonify(results)

#     except Exception as e:
#         print("PYTHON EXTRACTION ERROR:\n", traceback.format_exc())
#         return jsonify({
#             "error": "Extraction failed",
#             "details": str(e)
#         }), 500


# # if __name__ == "__main__":
# #     app.run(port=5001)


# if __name__ == "__main__":
#     import os
#     port = int(os.environ.get("PORT", 5001))
#     app.run(host="0.0.0.0", port=port)


from flask import Flask, request, jsonify
from openpyxl import load_workbook
import base64
import traceback
from io import BytesIO

app = Flask(__name__)


# 🔹 Safe anchor reader
def get_anchor(img):
    try:
        if hasattr(img.anchor, "_from"):
            return img.anchor._from.row + 1, img.anchor._from.col + 1
        elif hasattr(img.anchor, "from_"):
            return img.anchor.from_.row + 1, img.anchor.from_.col + 1
        else:
            return None, None
    except:
        return None, None


@app.route("/")
def home():
    return "Flask API is running!"


@app.route("/extract", methods=["POST"])
def extract_questions():
    try:
        # 1️⃣ Check file
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]

        # 2️⃣ Load Excel (IMPORTANT: data_only=True)
        wb = load_workbook(file, data_only=True)
        ws = wb.active

        results = []

        # 🔍 Debug (check if images exist on server)
        try:
            total_images = len(ws._images)
            print("TOTAL IMAGES FOUND:", total_images)
        except:
            print("NO IMAGE ATTRIBUTE FOUND")
            total_images = 0

        # 3️⃣ Loop rows (skip header)
        for row_index, row in enumerate(ws.iter_rows(min_row=2), start=2):

            if not any(cell.value for cell in row):
                continue

            unit = row[0].value
            co = row[1].value
            unit_title = row[2].value
            qtype = row[3].value
            part = row[4].value
            question_text = row[5].value
            marks = row[6].value
            bt = row[7].value
            level = row[8].value

            # normalize TYPE
            if qtype:
                qtype = str(qtype).strip().upper()

            # ---------- IMAGE DETECTION (ROBUST) ----------
            question_image = None

            if total_images > 0:
                for img in ws._images:
                    img_row, img_col = get_anchor(img)

                    # Question column = 6
                    if img_row == row_index and img_col == 6:
                        try:
                            # 🔹 SAFE extraction (works on Render)
                            image_stream = BytesIO()

                            if hasattr(img, "ref") and img.ref:
                                img.ref.save(image_stream, format="PNG")
                            else:
                                # fallback (rare case)
                                image_stream.write(img._data())

                            image_stream.seek(0)
                            img_bytes = image_stream.read()

                            if img_bytes:
                                question_image = base64.b64encode(img_bytes).decode("utf-8")

                        except Exception as img_error:
                            print("IMAGE EXTRACTION ERROR:", str(img_error))

                        break

            # ---------- STORE RESULT ----------
            results.append({
                "unit": unit,
                "co": co,
                "unit_title": unit_title,
                "type": qtype,
                "part": part,
                "marks": marks,
                "bt": bt,
                "level": level,
                "questionText": question_text if question_text else None,
                "questionImage": question_image
            })

        return jsonify(results)

    except Exception as e:
        print("PYTHON EXTRACTION ERROR:\n", traceback.format_exc())
        return jsonify({
            "error": "Extraction failed",
            "details": str(e)
        }), 500


# 🔥 DO NOT REMOVE (needed for local testing)
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)