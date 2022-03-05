"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileAnggota = void 0;
const Param_1 = require("../../Param");
const Util_1 = require("../../Util");
const RouterKons_1 = require("../RouterKons");
class EditProfileAnggota {
    render(anggota) {
        return `
		<!DOCTYPE html>
		<html lang="id">
        <head>
            <title>edit info</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">           
            <link href='/css/bootstrap.min.css' rel='stylesheet' />
            <link rel='stylesheet' href="/css/umum.css?r=${Util_1.util.randId}" />
        </head>
        <body>
            <div class="container">

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a class='' href="${RouterKons_1.RouterKOns.g_anggota_daftar}">daftar</a></li>
                        <li class="breadcrumb-item active" aria-current="page">edit info</li>
                    </ol>
                </nav>

                <form 
                    class="anggota"
                    action="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_id_info_edit, [anggota.id + ''])}" 
                    method="post"
                    ${Param_1.Param.HA_URL}="${Util_1.util.getUrl(RouterKons_1.RouterKOns.g_anggota_daftar, [anggota.id + ''])}"
                    ${Param_1.Param.HA_DLG}="Data telah disimpan"
                    >

                    <hr/>

                    <div class="form-group">
                        <label for="nama">nama:</label>
                        <input type="text"
                            class="form-control"
                            name="nama"
                            id="nama"
                            maxlength="50"
                            placeholder="nama panggilan"
                            required
                            value="${anggota.nama}"/>
                    </div>

                    <div class="form-group">
                        <label for="nama_lengkap">nama lengkap:</label>
                        <input type="text"
                            class="form-control"
                            name="nama_lengkap"
                            id="nama_lengkap"
                            maxlength="50"
                            placeholder="nama lengkap"
                            required
                            value="${anggota.nama_lengkap || ''}"/>
                    </div>

                    <div class="form-group">
                        <label for="alamat">alamat:</label>
                        <textarea
                            class="form-control"
                            name="alamat"
                            id="alamat"
                            maxlength="200"
							rows=4
                            placeholder="alamat"
                            value="">${anggota.alamat || ''}</textarea>
                    </div>

                    <div class="form-group">
                        <label for="tgl_lahir">tanggal lahir:</label>
                        <input type="date"
                            class="form-control"
                            name="tgl_lahir"
                            id="tgl_lahir"
                            ${this.formatDate(anggota.tgl_lahir)}/>
                    </div>

                    <div class="form-group">
                        <label for="tgl_meninggal">tanggal meninggal:</label>
                        <input type="date"
                            class="form-control"
                            name="tgl_meninggal"
                            id="tgl_meninggal"
                            ${this.formatDate(anggota.tgl_meninggal)}/>
                    </div>

					<p>jenis kelamin:</p>
                    <div class="form-check">
						<input type="radio" class="form-check-input" name="jkl" id="jkl1" value="l" ${this.selected(anggota, "l")}>
                        <label for="jkl1">laki-laki</label>
                    </div>

                    <div class="form-check">
						<input type="radio" class="form-check-input" name="jkl" id="jkl2" value="p" ${this.selected(anggota, "p")}>
                        <label for="jkl2">perempuan:</label>
                    </div>

                    <div class="form-group">
                        <label for="wa">no wa:</label>
                        <input type="text"
                            class="form-control"
                            name="wa"
                            id="wa"
                            maxlength="15"
                            placeholder="no wa"
                            value="${anggota.wa || ''}"/>
                    </div>

                    <div class="form-group">
                        <label for="fb">facebook:</label>
                        <input type="text"
                            class="form-control"
                            name="fb"
                            id="fb"
                            maxlength="128"
                            placeholder="alamat fb"
                            value="${anggota.fb || ''}"/>
                    </div>

                    <div class="form-group">
                        <label for="instagram">instagram:</label>
                        <input type="text"
                            class="form-control"
                            name="instagram"
                            id="instagram"
                            maxlength="128"
                            placeholder="instagram"
                            value="${anggota.instagram || ''}"/>
                    </div>

                    <div class='text-align-center'>
                        <button type="submit" class="btn btn-primary btn-sm submit col-12 col-sm-6">simpan</button>
                    </div>

                </form>

            </div>
            <br/>
            <br/>
            
            <script type="module" src="/js${Util_1.Util.revisi}/comp/Umum.js?r=${Util_1.util.randId}"></script>
        </body>
		</html>`;
    }
    selected(anggota, value) {
        if (anggota.jkl == value)
            return "checked";
        return "";
    }
    formatDate(str) {
        if (!str || "" == str)
            return '';
        let date = new Date(str);
        if ('Invalid Date' == (date + ''))
            return '';
        return ` value="` + date.getFullYear() + "-" + this.padding(date.getMonth() + '') + "-" + this.padding(date.getDate() + '') + '"';
    }
    padding(str) {
        str = "00000" + str;
        return str.slice(str.length - 2);
    }
}
exports.EditProfileAnggota = EditProfileAnggota;
