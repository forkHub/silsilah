import { Param } from "../../Param";
import { util, Util } from "../../Util";
import { RouterKOns } from "../RouterKons";

export class Silsilah {
	render(data: ISlAnggota): string {
		return `
			<html>

			<head>
				<meta name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, target-densityDpi=device-dpi">
					<link rel="stylesheet" href='/css/css.css?r=${util.randId}' />
					<link rel="stylesheet" href='/css/umum.css?r=${util.randId}' />
					<link rel="stylesheet" href='/css/silsilah.css?r=${util.randId}' />
			</head>
			
			<body>
				<button ${Param.HA_KLIK} ${Param.HA_GET}=${RouterKOns.g_anggota_daftar}>admin</button>
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
				<script type='module' src='/js${Util.revisi}/silsilah/Silsilah.js?r=${util.randId}'></script>
				<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
				</body>
			</html>
		`;
	}
}