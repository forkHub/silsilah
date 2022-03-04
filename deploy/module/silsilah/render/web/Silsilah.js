"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Silsilah = void 0;
const Param_1 = require("../../../Param");
const Util_1 = require("../../../Util");
const RouterKons_1 = require("../../RouterKons");
class Silsilah {
    render(data) {
        return `
			<html>

			<head>
				<meta name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, target-densityDpi=device-dpi">
					<link rel="stylesheet" href='/css/css.css?r=${Util_1.util.randId}' />
					<link rel="stylesheet" href='/css/umum.css?r=${Util_1.util.randId}' />
					<link rel="stylesheet" href='/css/silsilah.css?r=${Util_1.util.randId}' />
			</head>
			
			<body>
				<button ${Param_1.Param.HA_KLIK} ${Param_1.Param.HA_GET}=${RouterKons_1.RouterKOns.g_anggota_daftar}>admin</button>
				<div class='silsilah-cont'>

				</div>

				<template>

					<div class="cont anggota-cont disp-table-cell">
						
						<div class="hubung-cont">
						</div>

						<div class="atas disp-table">
							<div class="utama disp-table-cell text-align-center">
								<div class="hubung-cont utama">
								</div>
								<div class='foto-cont'>
									<div class='foto'></div>
									<img src="" class="foto padding">
									<div class="nama text-align-center"></div>
									<div class='text-align-center margin-bottom-8'>
										<button class="profile"> profile </button>
									</div>
								</div>
							</div>
			
							<div class="pasangan display-none text-align-left">
								<div class="hubung-cont istri">
								</div>
								<div class='foto-cont'>
									<div class='foto'></div>
									<img src="" class="foto padding">
									<div class="nama text-align-center"></div>
									<div  class='text-align-center margin-bottom-8'>
										<button class="profile"> profile </button>
									</div>
								</div>
							</div>
						</div>

						<div class="bawah display-none">
			
						</div>
					</div>

				</template>
				<script>
					var data = ${JSON.stringify(data)}
				</script>
				<script type='module' src='/js${Util_1.Util.revisi}/silsilah/Silsilah.js?r=${Util_1.util.randId}'></script>
				<script type="module" src="/js${Util_1.Util.revisi}/comp/Umum.js?r=${Util_1.util.randId}"></script>
				</body>
			</html>
		`;
    }
}
exports.Silsilah = Silsilah;
