import fs from "fs"
import path from "path"

export const delete_file=(file_path:string)=>{
    if (!file_path) return;
    const full_path=path.join(process.cwd(),file_path)
    if (fs.existsSync(full_path)){
        fs.unlinkSync(full_path);
    }
}