import os

folder_path = 'png_seq'  # Replace with the path to your folder
output_folder = 'png'   # Replace with the path to the folder where you want to save the renamed files

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

file_list = os.listdir(folder_path)
file_list.sort()  # Sort the files to ensure sequential numbering

for i, filename in enumerate(file_list):
    if filename.endswith('.png'):
        new_name = str(i + 1) + '.png'
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(output_folder, new_name)
        os.rename(old_path, new_path)
        print(f'Renamed: {filename} -> {new_name}')
