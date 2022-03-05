"use strict";
var ha;
(function (ha) {
    var sl;
    (function (sl) {
        class RouterKOns {
        }
        RouterKOns.gp_auth_login = "/sm/auth/login";
        RouterKOns.g_anggota_daftar = "/sm/anggota/daftar";
        RouterKOns.g_anggota_daftar_kunci_hal = "/sm/anggota/daftar/kunci/:kunci/hal/:hal";
        RouterKOns.g_anggota_id_lihat = "/sm/anggota/:id/lihat/";
        RouterKOns.g_beranda_lihat_id = "/sm/beranda/lihat/:id";
        RouterKOns.g_anggota_id_info_edit = "/sm/anggota/:id/info/edit";
        RouterKOns.g_anggota_id_edit_beranda = "/sm/anggota/:id/edit/beranda";
        RouterKOns.gp_anggota_baru = "/sm/anggota/baru";
        RouterKOns.p_anggota_hapus_id = "/sm/anggota/hapus/:id";
        RouterKOns.p_anggota_id_rel_edit_id = "/sm/anggota/:id/rel/edit/:id2";
        //hanya get
        RouterKOns.g_anggota_id_pas_tambah = "/sm/anggota/:id/pasangan/tambah";
        RouterKOns.g_anggota_id_pas_tambah_kunci_hal = "/sm/anggota/:id/pasangan/tambah/kunci/:kunci/hal/:hal";
        //post
        RouterKOns.p_anggota_id_pas_lihat = "/sm/anggota/:id/pasangan/lihat";
        //post
        RouterKOns.p_anggota_id_anak_baca = "/sm/anggota/:id/anak/baca";
        RouterKOns.p_anggota_id_gbr_upload = "/sm/anggota/:id/gbr/upload";
        RouterKOns.p_anggota_id_ortu_edit_id = "/sm/anggota/:id/ortu/edit/:id2";
        RouterKOns.g_anggota_id_anak_tambah = "/sm/anggota/:id/anak/tambah";
        RouterKOns.g_anggota_id_anak_tambah_kunci_hal = "/sm/anggota/:id/anak/tambah/kunci/:kunci/hal/:hal";
        RouterKOns.rel_daftar = "/sm/rel/daftar";
        RouterKOns.rel_hapus_id = "/sm/rel/hapus/:id";
        sl.RouterKOns = RouterKOns;
    })(sl = ha.sl || (ha.sl = {}));
})(ha || (ha = {}));
