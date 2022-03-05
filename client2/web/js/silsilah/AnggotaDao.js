"use strict";
var ha;
(function (ha) {
    var sl;
    (function (sl) {
        class AnggotaDao {
            async bacaAnak(anggota) {
                if (anggota.rel_id == 0) {
                    console.debug('tidak ada data pasangan.');
                    return [];
                }
                let h = await ha.comp.Util.Ajax2('post', ha.comp.Util.getUrl(sl.RouterKOns.p_anggota_id_anak_baca, [anggota.id]), '');
                return JSON.parse(h);
            }
            async bacaPasangan(anggota) {
                console.group('baca pasangan api:');
                let pas = [];
                let url = ha.comp.Util.getUrl(sl.RouterKOns.p_anggota_id_pas_lihat, [anggota.id]);
                let hasil = await ha.comp.Util.Ajax2('post', url, '');
                pas = JSON.parse(hasil);
                console.log('pasangan');
                console.log(pas);
                console.groupEnd();
                return pas;
            }
            async bacaId(id) {
                return (await ha.comp.Util.sql(`
				SELECT *
				FROM sl_anggota
				WHERE id = ${id}`));
            }
        }
        sl.anggotaDao = new AnggotaDao();
    })(sl = ha.sl || (ha.sl = {}));
})(ha || (ha = {}));
