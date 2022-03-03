export class RouterAPIKOns {

	//auth
	static readonly api_auth_login: string = "/api/auth/login";
	static readonly api_auth_logout: string = "/api/auth/logout";

	static readonly api_anggota_daftar: string = "/api/anggota/daftar";
	static readonly api_anggota_edit: string = "/api/anggota/edit";
	static readonly api_anggota_hapus: string = "/api/anggota/hapus";
	static readonly api_anggota_update: string = "/api/anggota/update";



	//TODO: gak dipakai, sudah masuk parameter dari daftar
	static readonly api_anggota_daftar_kunci_hal: string = "/api/anggota/daftar/kunci/:kunci/hal/:hal";

	//TODO: beranda gak dipakai
	static readonly api_beranda_lihat_id: string = "/sm/beranda/lihat/:id";
	static readonly api_beranda_id: string = "/sm/beranda/:id";

	static readonly api_anggota_id_info_edit: string = "/sm/anggota/:id/info/edit";
	static readonly api_anggota_id_edit_beranda: string = "/sm/anggota/:id/edit/beranda";

	static readonly api_anggota_baru: string = "/sm/anggota/baru";
	static readonly api_anggota_hapus_id: string = "/sm/anggota/hapus/:id";
	static readonly api_anggota_id_rel_edit_id: string = "/sm/anggota/:id/rel/edit/:id2";

	//hanya get
	static readonly api_anggota_id_pas_tambah: string = "/sm/anggota/:id/pasangan/tambah";
	static readonly api_anggota_id_pas_tambah_kunci_hal: string = "/sm/anggota/:id/pasangan/tambah/kunci/:kunci/hal/:hal";

	//post
	static readonly api_anggota_id_pas_lihat: string = "/sm/anggota/:id/pasangan/lihat";

	//post
	static readonly api_anggota_id_anak_baca: string = "/sm/anggota/:id/anak/baca";
	static readonly api_anggota_id_gbr_upload: string = "/sm/anggota/:id/gbr/upload";

	static readonly api_anggota_id_ortu_edit_id: string = "/sm/anggota/:id/ortu/edit/:id2";

	static readonly api_anggota_id_anak_tambah: string = "/sm/anggota/:id/anak/tambah";
	static readonly api_anggota_id_anak_tambah_kunci_hal: string = "/sm/anggota/:id/anak/tambah/kunci/:kunci/hal/:hal";

	static readonly rel_daftar: string = "/sm/rel/daftar";
	static readonly rel_hapus_id: string = "/sm/rel/hapus/:id";
}