"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Param_1 = require("../../Param");
const Util_1 = require("../../Util");
const RouterKons_1 = require("../RouterKons");
class AnggotaBaru {
    render() {
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
                        <li class="breadcrumb-item"><a class='' href="${RouterKons_1.RouterKOns.g_anggota_daftar}">🏠</a></li>
                        <li class="breadcrumb-item active" aria-current="page">baru</li>
                    </ol>
                </nav>

                <form 
                    class="anggota"
                    action="${RouterKons_1.RouterKOns.gp_anggota_baru}" 
                    method="post"
                    ${Param_1.Param.HA_URL}="${RouterKons_1.RouterKOns.g_anggota_daftar}"
                    ${Param_1.Param.HA_DLG}="Data telah disimpan"
					${Param_1.Param.HA_MANUAL}
                    >

                    <hr/>

                    <div class="form-group">
                        <label for="nama">nama:</label>
                        <input type="text" class="form-control nama-barang" name="nama" id="nama-barang"
                            maxlength="50" placeholder="nama" required value="" />
                    </div>

                    <div class="form-group">
                        <label for="nama_lengkap">nama lengkap:</label>
                        <input type="text"
                            class="form-control"
                            name="nama_lengkap"
                            id="nama_lengkap"
                            maxlength="50"
                            placeholder="nama lengkap"
                            required/>
                    </div>

                    <div class="form-group">
                        <label for="alamat">alamat:</label>
                        <textarea
                            class="form-control"
                            name="alamat"
                            id="alamat"
                            maxlength="200"
							rows=4
                            placeholder="alamat"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="tgl_lahir">tanggal lahir:</label>
                        <input type="date"
                            class="form-control"
                            name="tgl_lahir"
                            id="tgl_lahir"/>
                    </div>

                    <div class="form-group">
                        <label for="tgl_meninggal">tanggal meninggal:</label>
                        <input type="date"
                            class="form-control"
                            name="tgl_meninggal"
                            id="tgl_meninggal"/>
                    </div>

					<p>jenis kelamin:</p>
                    <div class="form-check">
						<input type="radio" class="form-check-input" name="jkl" id="jkl1" value="l" checked>
                        <label for="jkl1">laki-laki</label>
                    </div>

                    <div class="form-check">
						<input type="radio" class="form-check-input" name="jkl" id="jkl2" value="p">
                        <label for="jkl2">perempuan:</label>
                    </div>

                    <div class="form-group">
                        <label for="wa">no wa: (62xxx) </label>
                        <input type="text"
                            class="form-control"
                            name="wa"
                            id="wa"
                            maxlength="15"
                            placeholder="no wa"/>
                    </div>

                    <div class="form-group">
                        <label for="fb">facebook:</label>
                        <input type="text"
                            class="form-control"
                            name="fb"
                            id="fb"
                            maxlength="128"
                            placeholder="alamat fb"/>
                    </div>

                    <div class="form-group">
                        <label for="instagram">instagram:</label>
                        <input type="text"
                            class="form-control"
                            name="instagram"
                            id="instagram"
                            maxlength="128"
                            placeholder="instagram"/>
                    </div>

                    <div class='text-align-center'>
                        <button type="submit" class="btn btn-primary btn-sm submit col-12 col-sm-6">simpan</button>
                    </div>

                </form>

            </div>
            <br/>
            <br/>
            
            <script type="module" src="/js${Util_1.Util.revisi}/comp/Umum.js?r=${Util_1.util.randId}"></script>
            <script type="module" src="/js${Util_1.Util.revisi}/silsilah/AnggotaBaru.js?r=${Util_1.util.randId}"></script>
        </body>
		</html>`;
    }
}
exports.AnggotaBaru = AnggotaBaru;
